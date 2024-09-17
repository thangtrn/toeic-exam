import writeXlsxFile from "write-excel-file";
import Button from "./Button";

const summaryData = (listeningPoints: number, writingPoints: number) => [
   [
      {
         type: String,
         value: "Date",
         fontWeight: "bold",
         borderColor: "#000000",
         color: "#ffff",
         align: "center",
         backgroundColor: "#83E28E",
      },
      {
         type: String,
         value: "Listening points",
         fontWeight: "bold",
         borderColor: "#000000",
         color: "#ffff",
         align: "center",
         backgroundColor: "#83E28E",
      },
      {
         type: String,
         value: "writing points",
         fontWeight: "bold",
         borderColor: "#000000",
         color: "#ffff",
         align: "center",
         backgroundColor: "#83E28E",
      },
      {
         type: String,
         value: "Total points",
         fontWeight: "bold",
         borderColor: "#000000",
         color: "#ffff",
         align: "center",
         backgroundColor: "#83E28E",
      },
   ],
   [
      {
         type: Date,
         value: new Date(),
         format: "hh:mm dd/mm/yyyy",
         borderColor: "#000000",
         align: "center",
      },
      { value: `${listeningPoints}/495`, borderColor: "#000000", align: "center" },
      { value: `${writingPoints}/495`, borderColor: "#000000", align: "center" },
      { value: `${listeningPoints + writingPoints}/990`, borderColor: "#000000", align: "center" },
   ],
];

const tableData = (listeningAnswers: IAnswer[], writingAnswers: IAnswer[]) => {
   const data = listeningAnswers.map((item, index) => [
      {
         type: Number,
         value: item.index,
         align: "center",
         borderColor: "#000000",
      },
      {
         type: String,
         value: item.answer || "",
         align: "center",
         borderColor: "#000000",
      },
      {
         type: Boolean,
         value: item.isTrue,
         align: "center",
         borderColor: "#000000",
      },
      {},
      {
         type: Number,
         value: writingAnswers[index].index,
         align: "center",
         borderColor: "#000000",
      },
      {
         type: String,
         value: writingAnswers[index].answer || "",
         align: "center",
         borderColor: "#000000",
      },
      {
         type: Boolean,
         value: writingAnswers[index].isTrue,
         align: "center",
         borderColor: "#000000",
      },
   ]);
   return [
      [
         {
            type: String,
            value: "No.",
            fontWeight: "bold",
            borderColor: "#000000",
            color: "#ffff",
            align: "center",
            backgroundColor: "#83E28E",
         },
         {
            type: String,
            value: "Answer",
            fontWeight: "bold",
            borderColor: "#000000",
            color: "#ffff",
            align: "center",
            backgroundColor: "#83E28E",
         },
         {
            type: String,
            value: "True/False",
            fontWeight: "bold",
            borderColor: "#000000",
            color: "#ffff",
            align: "center",
            backgroundColor: "#83E28E",
         },
         null,
         {
            type: String,
            value: "No.",
            fontWeight: "bold",
            borderColor: "#000000",
            color: "#ffff",
            align: "center",
            backgroundColor: "#83E28E",
         },
         {
            type: String,
            value: "Answer",
            fontWeight: "bold",
            borderColor: "#000000",
            color: "#ffff",
            align: "center",
            backgroundColor: "#83E28E",
         },
         {
            type: String,
            value: "True/False",
            fontWeight: "bold",
            borderColor: "#000000",
            color: "#ffff",
            align: "center",
            backgroundColor: "#83E28E",
         },
      ],
      [
         {
            value: "Listening",
            fontWeight: "bold",
            span: 3,
            align: "center",
            color: "#FF0000",
            borderColor: "#000000",
         },
         null,
         null,
         null,
         {
            value: "Wwwriting",
            fontWeight: "bold",
            span: 3,
            align: "center",
            color: "#FF0000",
            borderColor: "#000000",
         },
      ],
      ...data,
   ];
};

interface ExcelExportProps {
   listeningAnswers: IAnswer[];
   writingAnswers: IAnswer[];
   listeningPoints: number;
   writingPoints: number;
}

const ExcelExport = ({
   listeningAnswers,
   writingAnswers,
   listeningPoints,
   writingPoints,
}: ExcelExportProps) => {
   const handleExportExcel = async () => {
      const data: any = [
         [],
         ...summaryData(listeningPoints, writingPoints),
         [],
         ...tableData(listeningAnswers, writingAnswers),
      ];

      await writeXlsxFile(data, {
         columns: Array.from({ length: 8 }).map(() => ({ width: 16 })),
         fontSize: 13,
         fileName: "result-" + Date.now(),
      });
   };

   return (
      <Button variant="ghost" onClick={handleExportExcel}>
         Export
      </Button>
   );
};

export default ExcelExport;
