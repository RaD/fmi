export interface RotationPacketT {
    hash: string,
    values: number[],
}

export class RotationPacket implements RotationPacketT {
    constructor(
        public hash: string,
        public values: number[],
    ) {}
}
