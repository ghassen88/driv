import { LatLngExpression } from 'leaflet';

export interface Trajectory {
    Id : number;
    DebutDate: Date;
    FinDate: Date;
    departVille: string,
    arriveeVille: string,
    departAddress: string,
    arriveeAddress: string,
    layerId: number;
    chemin: LatLngExpression[],
    color: string,
    scoreSecurite: number,
    scoreEcoConduite: number,
    scoreDistraction: number
}