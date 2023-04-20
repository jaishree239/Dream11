import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import List from './components/List';

function App() {
  return (
    <>
      <Box sx={{ width: '100%', display:'flex', alignItem : 'center',      justifyContent: 'center' }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <List />
        </Grid>
      </Box>
    </>
  );
}

export default App;

