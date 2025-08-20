/**
 * Базовые поля.
 */
export interface BaseFieldsT {
    taskId: string
    kind: string
    action: string
    hash: string
}

export interface UploadFileInfoT {
    task: string
    hash: string
    content: string | ArrayBuffer | null
    extension: string
    fileMeta: FileMeta
};

export class UploadFileInfo implements UploadFileInfoT {
    constructor(
        public task: string,
        public hash: string,
        public content: string | ArrayBuffer | null,
        public extension: string,
        public fileMeta: FileMeta,
    ) {}
}

export interface CheckExistenceRequestT extends BaseFieldsT {
    extension: string
}

/**
 * Поля с метаинформацией о файле.
 */
export interface FileMetaT {
    lastModified: number
    name: string
    size: number
    type: string
    content: string
}

export class FileMeta implements FileMetaT {
    constructor(
        public type: string,
        public name: string,
        public size: number,
        public lastModified: number,
        public content: string
    ) {}
}


/**
 * Пакет запроса для загрузки модели в облако.
 *
 * Если content отсутствует, значит отправляются изменения,
 * а не производится загрузка модели.
 */
export interface UploadRequestT extends BaseFieldsT {
    meta?: FileMetaT
}

export class UploadRequest implements UploadRequestT {
    constructor(
        public taskId: string,
        public kind: string,
        public action: string,
        public hash: string,
        public meta?: FileMetaT,
    ) {}
}

/**
 * Поля с метаинформацией о запущенных в облаке задачах.
 */
export interface UploadMetaT {
    renderId: string
    stlcostId: string
}

/**
 * Пакет ответа на загрузку модели в облако.
 */
export interface UploadResponseT extends BaseFieldsT {
    meta: UploadMetaT
    status: number
    message: string
}

export class UploadResponse implements UploadResponseT {
    constructor(
        public taskId: string,
        public kind: string,
        public action: string,
        public hash: string,
        public meta: UploadMetaT,
        public status: number,
        public message: string,
    ) {}
}

export interface ModerationdResponseT extends BaseFieldsT {
    status: number
    message: string
}
