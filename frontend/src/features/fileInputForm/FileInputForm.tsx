import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { mixed, object } from "yup";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { FormControl, Typography } from "@mui/material";

import { useAddCustomFileMutation, useAddFileDataMutation } from "./fileInputFormFileApi";
import Spinner from "../../components/Spinner";
import Delayed from "../../components/Delayed";

const schema = object().shape({
    myFile: mixed()
        .test("fileSize", "Максимальный размер файла 5 Мбайт", (value) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            if (!value.length) return true;
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            return value[0].size <= 5242880;
        })
        .test("fileType", "Неподдерживаемый тип файла", (value) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            if (value[0]) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
                return value[0].name.endsWith("pdf") && value[0].type === "application/pdf";
            }
            return true;
        }),
});

const FileInputForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const [content, setContent] = useState("");
    const [fileLoadReady, setFileLoadReady] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const [AddCustomFile, { data, status, isLoading }] = useAddCustomFileMutation();
    const [AddFileData] = useAddFileDataMutation();

    const canSave = !!content && !isLoading;
    const isPending = status === "pending";

    const documentUserName = document.getElementById("current_user_name");
    const hiddenUser = documentUserName ? documentUserName.innerText : "Anonymous";

    const onContentChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setFileLoadReady(true);
        setContent(e.currentTarget.value);
    };

    const onUploadFileClicked = async (mydata) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
        const inputFile: File = mydata.myFile[0];
        const formData = new FormData();
        setFileLoadReady(false);
        if (canSave && typeof inputFile !== "undefined") {
            try {
                formData.append("customfile", inputFile, inputFile.name);
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                const returned = await AddCustomFile(formData).unwrap();
                await AddFileData({
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
                    filename: returned.filename,
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
                    content: returned.content,
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
                    type: returned.type,
                    user_hidden_name: hiddenUser,
                });
            } catch (err) {
                // eslint-disable-next-line no-console
                console.error("Failed to save the post: ", err);
            }
        }
        reset();
    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const inputFileName: string = data ? (data.filename as string) : "";
    const statusMock = "Ждём загрузку файла";

    const statusMap = new Map();
    statusMap.set("pending", " ");
    statusMap.set("rejected", "Ошибка сервера");
    statusMap.set("fulfilled", `Загружен файл ${inputFileName}`);
    let currentStatus: string = (statusMap.get(status) as string) || (statusMock as string);

    if (Object.keys(errors).length === 0) {
        currentStatus = fileLoadReady === true ? statusMock : currentStatus;
    } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        currentStatus = errors.myFile?.message as string;
    }

    const CurrentStatusWrapper = () => (
        <Delayed mock={statusMock} waitBeforeShow={5000}>
            <div>{currentStatus}</div>
        </Delayed>
    );

    return (
        <>
            <Card>
                <CardContent>
                    <CardHeader>
                        <h5>Добавьте PDF файл</h5>
                    </CardHeader>
                    <FormControl>
                        <input
                            name="fileItem"
                            className="form-control"
                            disabled={isPending}
                            style={isPending ? { color: `transparent` } : {}}
                            accept=".pdf"
                            type="file"
                            {...register("myFile", { required: true })}
                            onChange={(e) => {
                                onContentChanged(e);
                            }}
                        />
                        <Typography variant="h5" component="div">
                            {isPending && <Spinner height={40} width={40} />}
                            <CurrentStatusWrapper />
                        </Typography>
                        <Button
                            type="button"
                            onClick={handleSubmit(onUploadFileClicked)}
                            hidden={isPending}>
                            Отправить
                        </Button>
                    </FormControl>
                </CardContent>
            </Card>
        </>
    );
};

export default FileInputForm;
