import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Rating,
  Divider,
} from '@mui/material';
import { Grid, FormControl, InputLabel, FormLabel, Box, Typography } from '@mui/material';
import '@fontsource/roboto'; // Usamos la fuente Roboto

// Crear un tema personalizado para la aplicación
const theme = createTheme({
  palette: {
    primary: {
      main: '#4CAF50', // Verde para el tema principal
    },
    secondary: {
      main: '#8BC34A', // Verde más claro para los elementos secundarios
    },
    background: {
      default: '#F1F8E9', // Fondo beige claro inspirado en la naturaleza
    },
    text: {
      primary: '#2E7D32', // Verde oscuro para el texto principal
      secondary: '#1B5E20', // Verde más oscuro para los textos secundarios
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial', // Usamos la fuente Roboto
    h5: {
      fontWeight: 600,
      color: '#2E7D32', // Verde oscuro para los títulos
    },
    body1: {
      fontSize: 18,
    },
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#2E7D32', // Cambia el color de los textos en los campos de entrada
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: '#2E7D32', // Color del texto de las etiquetas de los grupos de radio
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '20px', // Botones más redondeados
          padding: '10px 20px',
          backgroundColor: '#66BB6A', // Color de fondo de los botones
          color: 'white', // Color del texto dentro de los botones
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          color: '#2E7D32', // Color verde para las etiquetas de FormControlLabel
        },
      },
    },
  },
});

// Componente principal de la aplicación
function App() {
  const [data, setData] = useState({
    name: '', // Almacena el nombre
    surname: '', // Almacena el apellido
    age: '', // Almacena la edad
    gender: '', // Almacena el género
    language: '', // Almacena el lenguaje de programación favorito
    termsAccepted: false, // Indica si se han aceptado los términos
    score: 0, // Almacena la puntuación de la encuesta
  });

  const [dialogOpen, setDialogOpen] = useState(false); // Controla la apertura del diálogo de confirmación

  // Función para manejar cambios en los campos de entrada
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target; // Desestructura el evento
    setData({
      ...data,
      [name]: type === 'checkbox' ? checked : value, // Actualiza el estado basado en el tipo de entrada
    });
  };

  // Función para manejar cambios en la puntuación (Rating)
  const handleRatingChange = (event, newValue) => {
    setData({ ...data, score: newValue }); // Actualiza el valor de la puntuación
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    if (data.termsAccepted) { // Verifica si se han aceptado los términos
      setDialogOpen(true); // Abre el diálogo de confirmación
    }
  };

  // Función para cerrar el diálogo
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  // Función para reiniciar los campos del formulario
  const handleReset = () => {
    setData({
      name: '',
      surname: '',
      age: '',
      gender: '',
      language: '',
      termsAccepted: false,
      score: 0, // Reseteamos el valor del rating también
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ padding: '20px', backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
        <Typography variant="h5" align="center" gutterBottom>
          Formulario
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Nombre, Apellido, Edad en una sola fila */}
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                required
                label="Nombre"
                name="name"
                value={data.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                required
                label="Apellido"
                name="surname"
                value={data.surname}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                required
                label="Edad"
                name="age"
                type="number"
                value={data.age}
                onChange={handleChange}
              />
            </Grid>

            {/* Sección para Género y Lenguaje de Programación */}
            <Grid item xs={12} sm={6}>
              <FormControl required>
                <FormLabel style={{ color: '#2E7D32' }}>Género</FormLabel> {/* Color verde para la etiqueta */}
                <RadioGroup
                  name="gender"
                  value={data.gender}
                  onChange={handleChange}
                >
                  <FormControlLabel value="male" control={<Radio />} label="Masculino" />
                  <FormControlLabel value="female" control={<Radio />} label="Femenino" />
                  <FormControlLabel value="helicopter" control={<Radio />} label="Helicóptero de guerra apache" />
                  <FormControlLabel value="other" control={<Radio />} label="Otro" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Lenguaje de Programación Favorito</InputLabel>
                <Select
                  name="language"
                  value={data.language}
                  onChange={handleChange}
                >
                  <MenuItem value="javascript">JavaScript</MenuItem>
                  <MenuItem value="python">Python</MenuItem>
                  <MenuItem value="java">Java</MenuItem>
                  <MenuItem value="c#">C# / C++</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* Divider para separación visual */}
          <Divider sx={{ my: 4, backgroundColor: theme.palette.primary.main }} />

          {/* Puntuación (Rating) */}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box component="fieldset" mb={3} borderColor="transparent">
                <FormLabel component="legend">Puntuar Encuesta</FormLabel>
                <Rating
                  name="score"
                  value={data.score}
                  onChange={handleRatingChange}
                  max={5}
                  sx={{
                    color: theme.palette.primary.main, // Estrellas verdes
                  }}
                />
              </Box>
            </Grid>
          </Grid>

          {/* Checkbox para términos y condiciones */}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="termsAccepted"
                    checked={data.termsAccepted}
                    onChange={handleChange}
                  />
                }
                label={<span style={{ color: '#2E7D32' }}>He leído los términos y condiciones</span>} // Color verde para la etiqueta
              />
            </Grid>
          </Grid>

          {/* Botones de enviar y limpiar */}
          <Grid container spacing={2} justifyContent="space-between" style={{ marginTop: '20px' }}>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={!data.termsAccepted}
              >
                Enviar
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleReset}
              >
                Limpiar
              </Button>
            </Grid>
          </Grid>
        </form>

        {/* Modal Dialog para confirmación */}
        <Dialog open={dialogOpen} onClose={handleDialogClose}>
          <DialogTitle>Confirmación</DialogTitle>
          <DialogContent>
            <DialogContentText>¿Está seguro de enviar este formulario?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>No</Button>
            <Button onClick={() => { handleDialogClose(); console.log(data); }} autoFocus>
              Sí
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </ThemeProvider>
  );
}

export default App;
