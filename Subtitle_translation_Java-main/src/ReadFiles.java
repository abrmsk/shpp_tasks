import java.io.*;

/**
 * Subtitle translation 01
 */
public class ReadFiles implements Paths {
    public static void main(String[] args) {

        WorkFiles.cleanerFolder(DEST_PATH);
        WorkFiles.cleanerFile(EN_FILE_PATH);
        WorkFiles.cleanerFile(RU_FILE_PATH);

        String[] pathnames;
        File f = new File(SRC_PATH);
        pathnames = f.list();

        if (pathnames == null) return;

        try {
            // EN
            File enFile = new File(EN_FILE_PATH);
            FileWriter enWr = new FileWriter(enFile);
            BufferedWriter enWriter = new BufferedWriter(enWr);

            for (String pathname : pathnames) {
                String ext = WorkFiles.getFileExtension(pathname);
                if (ext.equals("srt")) {
                    readFile(SRC_PATH + pathname, enWriter);
                }
            }

            enWriter.close();
            enWr.close();

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // построчное считывание файла
    private static void readFile(String pathFile, BufferedWriter enWriter) {
        try {
            File file = new File(pathFile);
            FileReader fr = new FileReader(file);
            BufferedReader reader = new BufferedReader(fr);

            String line = reader.readLine();
            int stroke = 0;

            while (line != null) {
                stroke++;
                if (stroke == 5) enWriter.write(line + "\n");
                if (stroke == 8) stroke = 0;

                // считываем остальные строки в цикле
                line = reader.readLine();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
