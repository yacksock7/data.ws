package choi.toi.data.ws.util;

import choi.toi.data.ws.exception.ErrorCode;
import choi.toi.data.ws.exception.ServiceException;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections4.ListUtils;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class ExcelUtil {

    public List<String> convertExcelFile(MultipartFile file) {
        log.trace("convertExcelFile Start... file name = {}", file.getOriginalFilename());

        try {

            final InputStream is = file.getInputStream();
            final XSSFWorkbook workbook = new XSSFWorkbook(is);
            return convertWorkBook(workbook);

        } catch(IOException ioe) {
            log.warn("convertExcel Failed!! error message = {}", ioe.getMessage());
            throw new ServiceException(ErrorCode.CanNotParsing, "convertExcel Failed!!");
        }
    }

    public List<String> convertWorkBook(XSSFWorkbook workbook) {
        List<String> sourceTexts = new ArrayList<>();

        final int sheetCount = workbook.getNumberOfSheets();
        for (int i=0 ; i < sheetCount ; i++ ){
            final XSSFSheet sheet = workbook.getSheetAt(i);
            final List<String> sourceTextsBySheet = convertSheet(sheet);
            sourceTexts = ListUtils.union(sourceTexts, sourceTextsBySheet);

        }
        return sourceTexts;
    }

    public List<String> convertSheet(XSSFSheet sheet) {
        List<String> sourceTextsBySheet = new ArrayList<>();

        int lastRowIndex = sheet.getLastRowNum();
        log.trace("parsingSegmentsExcel lastRowIndex: >> {}", lastRowIndex);

        DataFormatter formatter = new DataFormatter();
        for(int rowIndex = 1; rowIndex <= lastRowIndex; rowIndex++) {

            Row row = sheet.getRow(rowIndex);
            Cell sourceText = row.getCell(0);

            if (sourceText == null || formatter.formatCellValue(sourceText).equals("")) {
//                if (rowIndex < lastRowIndex) {
//                    log.error("Not acceptable file, has empty row, empty row = {}, last row = {}", rowIndex, lastRowIndex);
//                    throw new BasicException(ErrorCode.CanNotParsing, "Not acceptable file, has empty row");
//                }
                continue;
            }

            sourceTextsBySheet.add(sourceText.getStringCellValue());
        }

        return sourceTextsBySheet;
    }
}
