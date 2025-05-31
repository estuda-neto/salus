import { Injectable } from '@nestjs/common';
import { CreateQuadroDto } from './dto/create-quadro.dto';
import { BaseService } from 'src/base/base.service';
import { Quadro } from './entities/quadro.entity';
import { PreferenciasService } from '../preferencias/preferencias.service';
import { UsuariosService } from '../usuarios/usuarios.service';
import { Preferencia } from '../preferencias/entities/preferencia.entity';
import { QuadroRepository } from './repositories/preferencias.repository';

@Injectable()
export class QuadrosService extends BaseService<Quadro, CreateQuadroDto> {
  constructor(
    private readonly quadroRepository: QuadroRepository,
    private readonly usuariosServices: UsuariosService,
    private readonly preferenciasServices: PreferenciasService
  ) {
    super(quadroRepository);
  }

  /**Transforma um horário em string (ex: '08:00:00') para minutos absolutos no dia.*/
  private toMinutos(diaSemana: number, hora: string): number {
    const [h, m] = hora.split(':').map(Number);
    return diaSemana * 1440 + h * 60 + m;
  }

  /** Converte minutos para string de horário no formato 'HH:mm'*/
  private minutosParaHora(min: number): string {
    const h = Math.floor(min / 60).toString().padStart(2, '0');
    const m = (min % 60).toString().padStart(2, '0');
    return `${h}:${m}`;
  }

  /** Gera um quadro de horários ideal onde todos os usuários estão disponíveis ao mesmo tempo.
   *  Pega os horarios que são masis unicos excluivos e mantém no quadro
   *  Busca os horarios mais conflituosos e tentar minimizar conflitos individuais, distribuir carga e fazer ajustes iterativos
  */
  async gerarQuadroHorarioIdeal(empresaId: number): Promise<{ diaSemana: number; inicio: string; fim: string; usuarios: number[] }[]> {
    const usuarioIds: number[] = await this.usuariosServices.obterIdsProfissionaisPorEmpresa(empresaId);
    const preferencias: Preferencia[] = await this.preferenciasServices.findByIdsAndDateRange(usuarioIds, new Date(0), new Date());

    const totalUsuarios = usuarioIds.length;
    const LIMIAR = 0.8; // 80% dos usuários mínimo

    // Matriz de disponibilidade: Map<diaSemana, Map<minuto, Set<usuarioId>>>
    const matriz = new Map<number, Map<number, Set<number>>>();

    for (const pref of preferencias) {
      const dia = pref.diaSemana;
      const inicioMin = this.toMinutos(0, pref.horaInicio) % 1440;
      const fimMin = this.toMinutos(0, pref.horaFim) % 1440;

      if (!matriz.has(dia)) matriz.set(dia, new Map());
      const diaMap = matriz.get(dia)!;

      for (let minuto = inicioMin; minuto < fimMin; minuto++) {
        if (!diaMap.has(minuto)) diaMap.set(minuto, new Set());
        diaMap.get(minuto)!.add(pref.usuarioId);
      }
    }

    const resultado: { diaSemana: number; inicio: string; fim: string; usuarios: number[] }[] = [];

    for (const [dia, horarios] of matriz.entries()) {
      let inicioAtual: number | null = null;
      let usuariosNoBloco: Set<number> = new Set();

      for (let minuto = 0; minuto <= 1440; minuto++) {
        const usuariosPresentes = horarios.get(minuto) || new Set();
        const percentual = usuariosPresentes.size / totalUsuarios;

        if (percentual >= LIMIAR) {
          if (inicioAtual === null) {
            inicioAtual = minuto;
            usuariosNoBloco = new Set(usuariosPresentes);
          } else {
            usuariosNoBloco = new Set([...usuariosNoBloco].filter(u => usuariosPresentes.has(u)));
          }
        } else {
          if (inicioAtual !== null) {
            resultado.push({
              diaSemana: dia,
              inicio: this.minutosParaHora(inicioAtual),
              fim: this.minutosParaHora(minuto),
              usuarios: [...usuariosNoBloco],
            });
            inicioAtual = null;
            usuariosNoBloco = new Set();
          }
        }
      }
    }

    return resultado;
  }

}
