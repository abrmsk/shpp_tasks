import java.io.File;
import java.io.FileNotFoundException;
import java.io.PrintWriter;

public class WorkFiles {

    // метод определения расширения файла
    public static String getFileExtension(String fileName) {
        if (fileName.lastIndexOf(".") != -1 && fileName.lastIndexOf(".") != 0)
            return fileName.substring(fileName.lastIndexOf(".") + 1);
        else return "";
    }

    // метод переименования файла
    public static String getNewNameFile(String fileName) {
        int lastIndex = fileName.lastIndexOf(".");

        if (lastIndex != -1 && lastIndex != 0) {
            String ext = fileName.substring(lastIndex);
            String name = fileName.substring(0, fileName.lastIndexOf(".", lastIndex - 1) + 1);

            return name + "ru" + ext;
        } else return "";
    }

    // удалить содержимое папки и саму папку
    public static void deleteFolder(File folder) {
        File[] files = folder.listFiles();
        if (files != null) { //some JVMs return null for empty dirs
            for (File f : files) {
                if (f.isDirectory()) {
                    deleteFolder(f);
                } else {
                    if (!f.delete()) {
                        System.out.println(f.getName() + " not deleted");
                    }
                }
            }
        }
//        Delete root folder
//        if (!folder.delete()) {
//            System.out.println(folder.getName() + " not deleted");
//        }
    }

    // удалить содержимое папки
    public static void cleanerFolder(String path) {
        File f = new File(path);
        File[] files = f.listFiles();

        if (files == null) return;

        try {
            for (File file : files) {
                if (!file.delete()) {
                    System.out.println(file.getName() + " not deleted");
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // очистить файл
    public static void cleanerFile(String file) {
        try {
            PrintWriter pw = new PrintWriter(file);
            pw.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }

    }
}
