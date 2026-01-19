import { useTranslation } from 'react-i18next';
import { useNotificationStore } from '@/hooks/use-toast';
import {
    Toast,
    ToastClose,
    ToastDescription,
    ToastProvider,
    ToastTitle,
    ToastViewport,
} from '@/components/ui/toast';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export function Toaster() {
    const { t } = useTranslation();
    const { toasts, confirmDialog, confirmAction, cancelAction, closeConfirm } = useNotificationStore();

    return (
        <>
            {/* Toast 通知 */}
            <ToastProvider>
                {toasts.map(({ id, title, description, variant }) => (
                    <Toast key={id} variant={variant}>
                        <div className="grid gap-1">
                            {title && <ToastTitle>{title}</ToastTitle>}
                            {description && <ToastDescription>{description}</ToastDescription>}
                        </div>
                        <ToastClose />
                    </Toast>
                ))}
                <ToastViewport />
            </ToastProvider>

            {/* 确认对话框 */}
            <Dialog open={confirmDialog.isOpen} onOpenChange={(open) => !open && closeConfirm()}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{confirmDialog.title}</DialogTitle>
                        <DialogDescription>{confirmDialog.description}</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={cancelAction}>
                            {confirmDialog.cancelText || t('common.cancel')}
                        </Button>
                        <Button
                            variant={confirmDialog.variant === 'destructive' ? 'destructive' : 'default'}
                            onClick={confirmAction}
                        >
                            {confirmDialog.confirmText || t('common.delete')}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
