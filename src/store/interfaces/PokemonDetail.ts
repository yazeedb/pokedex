export type PokemonDetail = {
  details: {
    abilities: {
      ability: {
        name: string;
        url: string;
      };
      is_hidden: boolean;
      slot: number;
    }[];
    base_experience: number;
    forms: { name: string; url: string }[];
    height: number;
    held_items: {
      item: { name: string; url: string };
      version_details: {
        rarity: number;
        version: {
          name: string;
          url: string;
        };
      }[];
    }[];
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    moves: {
      move: string;
      version_group_details: {
        level_learned_at: number;
        move_learn_method: {
          name: string;
          url: string;
        };
        version_group: {
          name: string;
          url: string;
        };
      };
    }[];
    name: string;
    order: number;
    species: {
      name: string;
      url: string;
    };
    sprites: {
      back_default: string;
      back_female: null;
      back_shiny: string;
      back_shiny_female: null;
      front_default: string;
      front_female: null;
      front_shiny: string;
      front_shiny_female: null;
    };
    stats: {
      base_stat: number;
      effort: number;
      stat: { name: string; url: string };
    }[];
    types: {
      slot: number;
      type: { name: string; url: string };
    }[];
    weight: number;
  };
  species: {
    base_happiness: number;
    capture_rate: number;
    color: { name: string; url: string };
    egg_groups: { name: string; url: string }[];
    evolution_chain: { url: string };
    evolves_from_species: null;
    form_descriptions: any[];
    forms_switchable: boolean;
    gender_rate: number;
    generation: {
      name: string;
      url: string;
    };
    growth_rate: {
      name: string;
      url: string;
    };
    habitat: {
      name: string;
      url: string;
    };
    has_gender_differences: boolean;
    hatch_counter: number;
    id: number;
    is_baby: boolean;
    name: string;
    order: number;
    pal_park_encounters: {
      area: {
        name: string;
        url: string;
      };
      base_score: number;
      rate: number;
    }[];
    pokedex_numbers: {
      entry_number: number;
      pokedex: {
        name: string;
        url: string;
      };
    }[];
    shape: {
      name: string;
      url: string;
    };
    varieties: {
      is_default: boolean;
      pokemon: {
        name: string;
        url: string;
      };
    }[];
    genus: string;
    flavor_text: string;
  };
};
