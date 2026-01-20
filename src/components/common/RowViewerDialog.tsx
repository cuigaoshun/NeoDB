import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Copy, Check, Hash, Type, Calendar, Binary } from "lucide-react";

interface ColumnInfo {
    name: string;
    type_name: string;
}

interface RowViewerDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    row: Record<string, any> | null;
    columns: ColumnInfo[];
    title?: string;
}

export function RowViewerDialog({
    open,
    onOpenChange,
    row,
    columns,
    title,
}: RowViewerDialogProps) {
    const { t } = useTranslation();
    const [copiedField, setCopiedField] = useState<string | null>(null);

    const handleCopyValue = async (fieldName: string, value: any) => {
        try {
            const textValue = value === null ? 'NULL' : (typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value));
            await navigator.clipboard.writeText(textValue);
            setCopiedField(fieldName);
            setTimeout(() => setCopiedField(null), 2000);
        } catch (error) {
            console.error("Failed to copy:", error);
        }
    };

    const getColumnTypeIcon = (typeName: string) => {
        const type = typeName.toUpperCase();
        if (type.includes("INT") || type.includes("FLOAT") || type.includes("DOUBLE") || type.includes("DECIMAL") || type.includes("BOOL")) {
            return <Hash className="h-3 w-3 text-blue-500" />;
        }
        if (type.includes("CHAR") || type.includes("TEXT") || type.includes("ENUM")) {
            return <Type className="h-3 w-3 text-orange-500" />;
        }
        if (type.includes("DATE") || type.includes("TIME")) {
            return <Calendar className="h-3 w-3 text-green-500" />;
        }
        if (type.includes("BLOB") || type.includes("BINARY")) {
            return <Binary className="h-3 w-3 text-purple-500" />;
        }
        return <Type className="h-3 w-3 text-gray-500" />;
    };

    const formatValue = (value: any): string => {
        if (value === null || value === undefined) {
            return 'NULL';
        }
        if (typeof value === 'object') {
            return JSON.stringify(value, null, 2);
        }
        return String(value);
    };

    if (!row) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl max-h-[85vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle>{title || t('common.viewRow', '查看行数据')}</DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-auto border rounded-md">
                    <Table>
                        <TableHeader className="sticky top-0 bg-muted">
                            <TableRow>
                                <TableHead className="w-[200px] font-semibold">{t('common.field', '字段')}</TableHead>
                                <TableHead className="w-[100px]">{t('common.type', '类型')}</TableHead>
                                <TableHead>{t('common.value', '值')}</TableHead>
                                <TableHead className="w-[60px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {columns.map((col) => {
                                const value = row[col.name];
                                const formattedValue = formatValue(value);
                                const isLongText = formattedValue.length > 100 || formattedValue.includes('\n');

                                return (
                                    <TableRow key={col.name}>
                                        <TableCell className="font-medium align-top">
                                            <span className="text-foreground">{col.name}</span>
                                        </TableCell>
                                        <TableCell className="align-top">
                                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                {getColumnTypeIcon(col.type_name)}
                                                <span className="lowercase">{col.type_name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="align-top">
                                            {value === null ? (
                                                <span className="text-muted-foreground italic">NULL</span>
                                            ) : isLongText ? (
                                                <pre className="whitespace-pre-wrap break-all text-sm font-mono bg-muted/30 p-2 rounded max-h-[200px] overflow-auto">
                                                    {formattedValue}
                                                </pre>
                                            ) : (
                                                <span className="text-sm">{formattedValue}</span>
                                            )}
                                        </TableCell>
                                        <TableCell className="align-top">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-6 w-6 p-0"
                                                onClick={() => handleCopyValue(col.name, value)}
                                                title={t('common.copy', '复制')}
                                            >
                                                {copiedField === col.name ? (
                                                    <Check className="h-3 w-3 text-green-600" />
                                                ) : (
                                                    <Copy className="h-3 w-3" />
                                                )}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            </DialogContent>
        </Dialog>
    );
}
