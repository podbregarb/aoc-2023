import fs from "fs";

export class FileUtils {
    public static readFileAtPath(filePath: string): Promise<string[]> {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }

                const rows = data.trim().split('\n').map(line => line.trim());
                resolve(rows);
            });
        });
    }
}
