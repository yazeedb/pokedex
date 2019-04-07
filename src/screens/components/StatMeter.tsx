import React from 'react';
import { Typography } from '@material-ui/core';
import { PokemonStat } from '../../store/interfaces/PokemonDetail';
import { typesToColors, colors } from '../shared/colors';
import { useWindowSize } from '../shared/useWindowSize';

type StatMeterProps = {
  stats: PokemonStat[];
  pokemonPrimaryType: string;
};

const calculateMeterWidth = (width: number, stat: number) =>
  (stat / 255) * width;

export const StatMeter: React.FunctionComponent<StatMeterProps> = ({
  stats,
  pokemonPrimaryType
}) => {
  const meterRef = React.useRef<HTMLDivElement>(null);
  const [meterWidth, setMeterWidth] = React.useState(0);
  const windowSize = useWindowSize();

  React.useEffect(() => {
    if (!meterRef.current) {
      return;
    }

    setMeterWidth(meterRef.current.offsetWidth);
  }, [windowSize.outerWidth]);

  return (
    <>
      {stats.map((stat) => {
        const pokemonTypeColor = typesToColors[pokemonPrimaryType];
        const borderRadius = '20px';

        return (
          <div key={stat.stat.name}>
            <Typography variant="h6" style={{ textTransform: 'capitalize' }}>
              {stat.stat.name}
            </Typography>
            <div
              ref={meterRef}
              style={{
                backgroundColor: colors.secondary,
                width: '100%',
                borderRadius
              }}
            >
              <div
                style={{
                  width: calculateMeterWidth(meterWidth, stat.base_stat),
                  backgroundColor: pokemonTypeColor,
                  marginTop: '10px',
                  marginBottom: '25px',
                  borderRadius
                }}
              >
                <Typography variant="h6" style={{ marginLeft: '10px' }}>
                  {stat.base_stat}
                </Typography>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
