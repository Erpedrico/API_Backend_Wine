declare module 'multer-storage-cloudinary' {
    import { StorageEngine } from 'multer';
    import { ConfigOptions } from 'cloudinary';

    export class CloudinaryStorage implements StorageEngine {
        constructor(options: {
            cloudinary: ConfigOptions;
            params?: {
                folder?: string;
                format?: string | ((req: any, file: any) => Promise<string>);
                public_id?: (req: any, file: any) => string;
            };
        });
        _handleFile(req: Express.Request, file: Express.Multer.File, callback: (error?: any, info?: Partial<Express.Multer.File>) => void): void;
        _removeFile(req: Express.Request, file: Express.Multer.File, callback: (error: Error) => void): void;
    }
}
