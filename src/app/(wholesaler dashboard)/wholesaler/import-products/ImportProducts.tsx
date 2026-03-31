"use client"
import { zodResolver } from '@hookform/resolvers/zod'
import { Upload } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

const importSchema = z.object({
    fileName: z.string().min(1, "Please select a CSV or XLSX file"),
})

type ImportValues = z.infer<typeof importSchema>

const ImportProducts = () => {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [isDragOver, setIsDragOver] = useState(false)
    const {
        handleSubmit,
        setValue,
        register,
        formState: { errors },
    } = useForm<ImportValues>({
        resolver: zodResolver(importSchema),
        defaultValues: {
            fileName: "",
        },
    })
    const [fileName, setFileName] = useState("")

    const onSubmit = (values: ImportValues) => {
        console.log("Import submitted", values)
    }

    const handleFileSelect = (file: File) => {
        const selected = file.name
        setFileName(selected)
        setValue("fileName", selected, { shouldValidate: true })
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragOver(true)
    }

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragOver(false)
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragOver(false)
        
        const files = e.dataTransfer.files
        if (files?.length > 0) {
            const file = files[0]
            if (file.type === 'text/csv' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                handleFileSelect(file)
            }
        }
    }

    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            handleFileSelect(file)
        }
    }

    return (
        <article className="rounded-lg border border-border bg-card p-5 sm:p-6">
            <h2 className="text-xl font-semibold text-title">Import Products</h2>
            <p className="mt-1 text-description text-sm">Bulk upload your products via CSV or Excel</p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
                <input
                    type="file"
                    accept=".csv,.xlsx"
                    className="hidden"
                    ref={inputRef}
                    onChange={handleFileInputChange}
                />
                <input type="hidden" {...register("fileName")} />

                <div 
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`grid place-items-center rounded-xl border border-dashed px-4 py-14 text-center transition-colors ${isDragOver ? 'border-main bg-main/5' : 'border-border'}`}
                >
                    <div className="grid size-14 place-items-center rounded-full bg-main/10 text-main">
                        <Upload className="size-7" />
                    </div>
                    <p className="mt-4 text-xl font-medium text-title">Click or drag file to upload</p>
                    <p className="mt-1 text-description">Support for CSV, XLSX (Max 10MB)</p>
                    <button
                        type="button"
                        onClick={() => inputRef.current?.click()}
                        className="mt-4 h-10 rounded-lg bg-main px-5 text-sm font-semibold text-white hover:opacity-90"
                    >
                        Select File
                    </button>
                    {fileName && <p className="mt-3 text-sm font-medium text-main">Selected: {fileName}</p>}
                    {errors.fileName && <p className="mt-2 text-xs text-red-500">{errors.fileName.message}</p>}
                </div>

                <button type="submit" className="sr-only">
                    Submit Import
                </button>
            </form>
        </article>
    )
}

export default ImportProducts
