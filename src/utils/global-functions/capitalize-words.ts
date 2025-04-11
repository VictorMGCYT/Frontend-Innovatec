

export const capitalizeWords = (str: string | undefined) => str?.toLowerCase().replace(/(^|\s)\S/g, char => char.toLocaleUpperCase('es-ES'));