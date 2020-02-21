import { CursorService } from './cursor.service';
import { Module, Global } from "@nestjs/common";

@Global()
@Module({
    providers:[CursorService],
    exports: [CursorService]
})
export class CursorModule{}