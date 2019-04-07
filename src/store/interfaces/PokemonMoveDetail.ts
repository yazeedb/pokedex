export type PokemonMoveDetail = {
  accuracy: number;
  damage_class: {
    name: string;
    url: string;
  };
  effect_chance: null;
  effect_changes: [];
  effect_entries: {
    effect: string;
    language: {
      name: string;
      url: string;
    };
    short_effect: string;
  }[];
  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
      url: string;
    };
    version_group: {
      name: string;
      url: string;
    };
  }[];
  generation: {
    name: string;
    url: string;
  };
  id: number;
  meta: {
    ailment: {
      name: string;
      url: string;
    };
    ailment_chance: number;
    category: {
      name: string;
      url: string;
    };
    crit_rate: number;
    drain: number;
    flinch_chance: number;
    healing: number;
    max_hits: null;
    max_turns: null;
    min_hits: null;
    min_turns: null;
    stat_chance: number;
  };
  name: string;
  names: {
    language: {
      name: string;
      url: string;
    };
    name: string;
  }[];
  power: number;
  pp: number;
  priority: number;
  target: {
    name: string;
    url: string;
  };
  type: {
    name: string;
    url: string;
  };
};
