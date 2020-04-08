import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

/**
 * Modal component
 */
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() id: string = 'nip-modal';
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() icon: IconDefinition;
  @Input() iconColor: string = '';
  @Input() showCloseButton: boolean = true;
  @Input() cancelButtonLabel: string = 'Cancel';
  @Input() showCancelButton: boolean = false;
  @Input() okButtonLabel: string = 'Ok';
  @Input() showOkButton: boolean = true;

  @Output() okButtonClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() cancelButtonClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() closeButtonClick: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('nipModal', {static: false}) private nipModal: TemplateRef<any>;

  modalReference: NgbModalRef;

  constructor(private modalService: NgbModal) {
  }

  ngOnInit() {
  }

  /**
   * Emit click for modal success button
   */
  onOk(): void {
    this.modalReference.close();
    this.okButtonClick.emit();
  }

  /**
   * Cancel the modal
   */
  onCancel(): void {
    this.modalReference.close();
    this.cancelButtonClick.emit();
  }

  /**
   * Clode the modal
   */
  onClose(): void {
    this.modalReference.close();
    this.closeButtonClick.emit();
  }

  /**
   * Open the modal
   */
  public open(): void {
    this.modalReference = this.modalService.open(this.nipModal, {ariaLabelledBy: 'modal-title'});
  }

}
