// src/models/user.ts
export interface User {
    id: number;
    nom: string;
    prenom: string;
    tel: string;
    mail: string;
    pwd: string;
    idSociete: number;
    adresse: string;
    type: string;
}
