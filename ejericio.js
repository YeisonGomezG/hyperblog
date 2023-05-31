// Ejemplo de uso
let x = [1, 2, 4, 6];  // Valores de x conocidos
let y = [3, 1, 2, 5];  // Valores de y conocidos
let punto = 3;        // Punto en el que se desea interpolar

function interpolacionNewton(x, y, punto) {
    let n = x.length - 1;
    let coeficientes = [];
  
    // Calcular las diferencias divididas de primer orden
    let diferenciasDivididas = y.slice();
  
    console.log(y);
    for (let i = 1; i <= n; i++) {
      for (let j = n; j >= i; j--) {
        diferenciasDivididas[j] = (diferenciasDivididas[j] - diferenciasDivididas[j - 1]) / (x[j] - x[j - i]);
      }
     
    }

    debugger;
    console.log(diferenciasDivididas)
  
    coeficientes.push(diferenciasDivididas[0]);
  
    // Calcular los coeficientes del polinomio de Newton
    for (let i = 1; i <= n; i++) {
      coeficientes.push(diferenciasDivididas[i]);
      for (let j = i - 1; j > 0; j--) {
        coeficientes[j] = coeficientes[j] * (punto - x[j - 1]) + coeficientes[j - 1];
      }
      coeficientes[0] = coeficientes[0] * (punto - x[i - 1]);
    }
  
    // Evaluar el polinomio interpolante en el punto deseado
    let valorInterpolado = coeficientes[n];
    for (let i = n - 1; i >= 0; i--) {
      valorInterpolado = valorInterpolado * (punto - x[i]) + coeficientes[i];
    }
  
    return valorInterpolado;
  }
  
  
  

  function extrapolacion(x, y, punto) {
    let n = x.length;
    let coeficientes = [];
  
    // Calcular las diferencias divididas de primer orden
    let diferenciasDivididas = [];
    for (let i = 0; i < n - 1; i++) {
      diferenciasDivididas.push((y[i + 1] - y[i]) / (x[i + 1] - x[i]));
    }
  
    coeficientes.push(y[n - 1]);
  
    // Calcular los coeficientes del polinomio de extrapolación
    for (let i = n - 2; i >= 0; i--) {
      coeficientes.push(coeficientes[n - 2 - i] * (punto - x[n - 1]) + diferenciasDivididas[i]);
    }
  
    // Evaluar el polinomio de extrapolación en el punto deseado
    let valorExtrapolado = coeficientes[n - 1];
    for (let i = n - 2; i >= 0; i--) {
      valorExtrapolado = valorExtrapolado * (punto - x[i]) + coeficientes[i];
    }
  
    return valorExtrapolado;
  }