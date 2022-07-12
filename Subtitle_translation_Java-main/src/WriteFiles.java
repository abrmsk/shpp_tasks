import java.io.*;

/**
 * Subtitle translation 02
 */
public class WriteFiles implements Paths {
    public static void main(String[] args) {
        String[] pathnames;
        File f = new File(SRC_PATH);
        pathnames = f.list();

        try {
            // RU
            File ruFile = new File(RU_FILE_PATH);
            FileReader ruFr = new FileReader(ruFile);
            BufferedReader ruReader = new BufferedReader(ruFr);

            assert pathnames != null;
            for (String pathname : pathnames) {
                String ext = WorkFiles.getFileExtension(pathname);
                if (ext.equals("srt")) {
                    readFile(SRC_PATH + pathname, ruReader);
                }
            }

            ruReader.close();

        } catch (IOException e) {
            e.printStackTrace();
        }

        WorkFiles.deleteFolder(new File(SRC_PATH));
        WorkFiles.cleanerFile(EN_FILE_PATH);
        WorkFiles.cleanerFile(RU_FILE_PATH);
    }

    // построчное считывание файла
    private static void readFile(String pathFile, BufferedReader ruReader) {
        try {
            // SRC
            File file = new File(pathFile);
            FileReader fr = new FileReader(file);
            BufferedReader reader = new BufferedReader(fr);
            String line = reader.readLine();

            // DEST
            File destFile = new File(DEST_PATH + WorkFiles.getNewNameFile(file.getName()));
            FileWriter writeFile = new FileWriter(destFile);

            int stroke = 0;

            while (line != null) {
                stroke++;

                // Запись перевода
                if (stroke == 5) {
                    String ruLine = ruReader.readLine();
                    if (ruLine != null) {
                        writeFile.write(ruLine + "\n");
                    }
                }

                // Запись копирование.
                else writeFile.write(line + "\n");


                if (stroke == 8) {
                    stroke = 0;
                }

                // считываем остальные строки в цикле
                line = reader.readLine();
            }

            writeFile.close();

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
