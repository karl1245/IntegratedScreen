export class Transport {
    request_time: string;
    source: string;
    acknowledgements: string;
    member: {
        type: string,
        name: string,
        latitude: number,
        longitude: number,
        accuracy: number,
        station_code: string,
        tiploc_code: string
    }
}