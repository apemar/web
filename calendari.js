// Función para generar todos los meses del año
function generarCalendarioAnual() {
    const añoActual = new Date().getFullYear();
    const mesesIds = [
        'diasEnero', 'diasFebrero', 'diasMarzo', 'diasAbril', 'diasMayo', 'diasJunio',
        'diasJulio', 'diasAgosto', 'diasSeptiembre', 'diasOctubre', 'diasNoviembre', 'diasDiciembre'
    ];
    
    for (let mes = 0; mes < 12; mes++) {
        generarMesEspecifico(mes, añoActual, mesesIds[mes]);
    }
}

// Función para detectar fechas festivas
function esFechaFestiva(fecha) {
    const dia = fecha.getDate();
    const mes = fecha.getMonth();
    
    // Festivos específicos
    const festivos = [
        {dia: 1, mes: 0},   // 1 enero - Año Nuevo
        {dia: 2, mes: 0},   // 2 enero - Año Nuevo
        {dia: 19, mes: 2},  // 19 marzo - San José
        {dia: 20, mes: 2},  // 20 marzo - San José
        {dia: 3, mes: 3},   // 3 abril - Semana Santa
        {dia: 6, mes: 3},   // 6 abril - Semana Santa
        {dia: 13, mes: 3},  // 13 abril - Semana Santa
        {dia: 1, mes: 4},   // 1 mayo - Día del Trabajo
        {dia: 24, mes: 5},  // 24 junio - San Juan
        {dia: 15, mes: 7},  // 15 agosto - Asunción
        {dia: 17, mes: 7},  // 17 agosto - San Roque
        {dia: 9, mes: 9},   // 9 octubre - Día de la Hispanidad
        {dia: 12, mes: 9},  // 12 octubre - Día de la Hispanidad
        {dia: 8, mes: 11},  // 8 diciembre - Inmaculada
        {dia: 25, mes: 11}  // 25 diciembre - Navidad
    ];
    
    return festivos.some(festivo => festivo.dia === dia && festivo.mes === mes);
}

// Función para generar un mes específico
function generarMesEspecifico(mes, año, idContainer) {
    const primerDia = new Date(año, mes, 1);
    const ultimoDia = new Date(año, mes + 1, 0);
    const diasEnMes = ultimoDia.getDate();
    const diaSemanaInicio = primerDia.getDay() || 7; // Convertir domingo 0 a 7
    
    const diasContainer = document.getElementById(idContainer);
    if (diasContainer) {
        diasContainer.innerHTML = '';
        
        // Crear días vacíos al inicio si es necesario
        for (let i = 1; i < diaSemanaInicio; i++) {
            const diaVacio = document.createElement('div');
            diaVacio.className = 'h-6';
            diasContainer.appendChild(diaVacio);
        }
        
        // Agregar días del mes
        const hoy = new Date();
        for (let dia = 1; dia <= diasEnMes; dia++) {
            const diaElement = document.createElement('div');
            const fechaActual = new Date(año, mes, dia);
            const esFinDeSemana = fechaActual.getDay() === 0 || fechaActual.getDay() === 6; // Domingo (0) o Sábado (6)
            const esFestivo = esFechaFestiva(fechaActual);
            const esPasado = fechaActual < hoy.setHours(0,0,0,0);
            const esHoy = fechaActual.toDateString() === hoy.toDateString();
            
            diaElement.textContent = dia;
            diaElement.className = 'text-center h-6 leading-6 rounded-sm transition flex items-center justify-center';
            
            if (esFestivo) {
                diaElement.className += ' bg-red-100 border border-red-400 font-semibold text-red-700';
            } else if (esFinDeSemana) {
                diaElement.className += ' bg-red-100 border border-red-400 font-semibold text-red-700';
            } else if (esPasado) {
                diaElement.className += ' text-gray-400 bg-gray-100';
            } else if (esHoy) {
                diaElement.className += ' bg-green-600 text-white font-semibold';
            } else {
                diaElement.className += ' bg-white border border-gray-300 hover:bg-green-50';
            }
            
            diasContainer.appendChild(diaElement);
        }
    }
}

// Inicialitzar calendari anual quan es carrega la pàgina
document.addEventListener('DOMContentLoaded', function() {
    generarCalendarioAnual();
});
