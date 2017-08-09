import { EventEmitter, ElementRef } from "@angular/core";
export declare class ModalHeader {
}
export declare class ModalContent {
}
export declare class ModalFooter {
}
export declare class Modal {
    modalClass: string;
    closeOnEscape: boolean;
    closeOnOutsideClick: boolean;
    title: string;
    hideCloseButton: boolean;
    cancelButtonLabel: string;
    submitButtonLabel: string;
    onOpen: EventEmitter<{}>;
    onClose: EventEmitter<{}>;
    onSubmit: EventEmitter<{}>;
    isOpened: boolean;
    modalRoot: ElementRef;
    private backdropElement;
    constructor();
    ngOnDestroy(): void;
    open(...args: any[]): void;
    close(...args: any[]): void;
    preventClosing(event: MouseEvent): void;
    private createBackDrop();
}
