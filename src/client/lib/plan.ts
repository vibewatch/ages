import { allow, FREE, type Feature, type PlanState } from '../../shared/lib/plan.ts';
import { load, save } from './storage.ts';

const today = (): string => { const d = new Date(); return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`; };

/** The device's plan: the build's gate, Pro unlocked on the device, and today's free map-reading rounds. */
export class Plan {
  readonly gate = import.meta.env.VITE_PRO_GATE === '1';
  pro = load<boolean>('pro', false, v => typeof v === 'boolean');
  private rounds = load<{ d: string; n: number }>('mapRounds', { d: '', n: 0 }, v => !!v && typeof v === 'object' && typeof (v as { d: unknown }).d === 'string' && typeof (v as { n: unknown }).n === 'number');

  constructor() {
    // a gated preview build: ?pro=1 tries the paid experience on this device
    if (this.gate && new URLSearchParams(location.search).get('pro') === '1') this.unlock();
  }

  private get state(): PlanState { return { gate: this.gate, pro: this.pro, mapRounds: this.rounds.d === today() ? this.rounds.n : 0 }; }
  can(f: Feature, chapter = 0): boolean { return allow(this.state, f, chapter); }
  /** Counts a map-reading round (free: FREE.mapRoundsPerDay a day). */
  useMapRound(): void {
    const n = this.state.mapRounds + 1;
    this.rounds = { d: today(), n };
    save('mapRounds', this.rounds);
  }
  unlock(): void { this.pro = true; save('pro', true); }
  readonly free = FREE;
}
