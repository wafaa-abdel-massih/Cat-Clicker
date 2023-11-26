package Controller;
import Model.*;
import View.ViewClass;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.ArrayList;

public class ControllerClass implements ActionListener{

    public FileOperations initialLoad = new FileOperations();
    private String headerPath = "./src/main/resources/InvoiceHeader.csv";
    private String linePath = "./src/main/resources/InvoiceLine.csv";
    public ArrayList<InvoiceHeader> headers = initialLoad.readFile(headerPath, linePath);
    public String[][] headerData;
    public ViewClass frame;

    public ControllerClass(){};
    public ControllerClass(ViewClass frame){
        this.frame = frame;
    };

    public String[][] loadHeader(){

        headerData  = new String[headers.size()][4];
        for (int i=0; i<headers.size(); i++){

            headerData[i][0] = String.valueOf(headers.get(i).getInvoiceNum());
            headerData[i][1] = headers.get(i).getInvoiceDate();
            headerData[i][2] = headers.get(i).getCustomerName();
            headerData[i][3] = String.valueOf(headers.get(i).getTotal());

        }
        return headerData;
    }

    public void load(){
        String[][] sHeader = loadHeader();
        frame = new ViewClass(sHeader);
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        String actionCommand = e.getActionCommand();
        switch (actionCommand){
            case "Create New Invoice":
                frame.headerDialog();
                break;
            case "Ok":
                frame.saveHeader();
                break;
            case "Cancel":
                frame.cancelHeader();
                break;
            case "Delete Invoice":
                frame.deleteHeader();
                break;
            case "Create Item":
                frame.lineDialog();
                break;
            case "ok line":
                frame.saveLine();
                break;
            case "cancel line":
                frame.cancelLine();
                break;
            case "Delete Item":
                frame.deleteLine();
                break;
            case "Load File":
                frame.loadFile();
                break;
            case "Save File":
                frame.saveFile();
                break;
        }
    }
}
