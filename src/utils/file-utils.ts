import fs from "fs";

export class FileUtils {
    public static readFileAtPath(filePath: string, separator = '\n'): Promise<string[]> {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }

                const rows = data.trim().split(separator).map(line => line.trim());
                resolve(rows);
            });
        });
    }
}
