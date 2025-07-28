export function calcularDV(rut) {
    let suma = 0;
    let multiplo = 2;
    rut = rut.toString().split("").reverse().join("");
    for (let i = 0; i < rut.length; i++) {
        suma += parseInt(rut[i], 10) * multiplo;
        multiplo = multiplo === 7 ? 2 : multiplo + 1;
    }
    const dv = 11 - (suma % 11);
    if (dv === 11) return "0";
    if (dv === 10) return "K";
    return dv.toString();
    
}

export function validarRutCompleto(rutCompleto) {
    // Remove dots and spaces
    rutCompleto = rutCompleto.replace(/\./g, "").replace(/\s/g, "");
    const match = rutCompleto.match(/^(\d+)-([\dkK])$/);
    if (!match) return false;
    const [, rut, dv] = match;
    return calcularDV(rut) === dv.toUpperCase();
}
