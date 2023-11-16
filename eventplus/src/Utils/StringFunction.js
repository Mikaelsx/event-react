/**
 * Função que inverte a data do banco de dados
 * @param {*} data 
 * @returns 
 */
export const dateFormatDbToView = data => {
    
    data = data.substr(0,10); // retorna apenas a data
    data = data.split("-"); //Retorna um array [2023, 09, 30]
    return `${data[2]}/${data[1]}/${data[0]}` //Retorna 30/09/2023
}