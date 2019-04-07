import React from 'react';
import { PokemonMove } from '../../store/interfaces/PokemonDetail';
import { PokemonMoveDetail } from '../../store/interfaces/PokemonMoveDetail';
import { Grid, Typography } from '@material-ui/core';
import { colors } from '../shared/colors';
import { TypeBadge } from '../shared/TypeBadge';

type MoveDetailsProps = {
  move: PokemonMove;
};

const getEnglishMoveDescription = (data: PokemonMoveDetail) => {
  const description = data.flavor_text_entries.find(
    (entry) => entry.language.name === 'en'
  );

  if (!description) {
    return 'Description not found!';
  }

  return description.flavor_text;
};

export const MoveDetails: React.FunctionComponent<MoveDetailsProps> = ({
  move
}) => {
  const [data, setData] = React.useState({} as PokemonMoveDetail);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch(move.move.url)
      .then((response) => response.json())
      .then((data: PokemonMoveDetail) => {
        setTimeout(() => {
          setData(data);
          setLoading(false);
        }, 1200);
      });
  }, []);

  return (
    <Grid
      container
      style={{
        backgroundColor: colors.secondary,
        padding: '24px'
      }}
    >
      {loading ? (
        <Typography variant="h6">Loading...</Typography>
      ) : (
        <>
          <Grid
            container
            style={{
              marginBottom: '15px'
            }}
          >
            <Grid item style={{ marginRight: '15px' }}>
              <TypeBadge types={[data.type.name]} />
            </Grid>
            <Grid item>
              Learned at level {move.version_group_details.level_learned_at}
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12} sm={4}>
              <b>Power: </b> {data.power || 'N/A'}
            </Grid>

            <Grid item xs={12} sm={4}>
              <b>Accuracy: </b> {data.accuracy}%
            </Grid>

            <Grid item xs={12} sm={4}>
              <b>PP: </b> {data.pp}
            </Grid>
          </Grid>
          <Typography
            variant="h5"
            style={{
              marginTop: '15px'
            }}
          >
            {getEnglishMoveDescription(data)}
          </Typography>
        </>
      )}
    </Grid>
  );
};

export default MoveDetails;
