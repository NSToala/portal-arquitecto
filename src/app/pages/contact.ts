import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SITE } from '../data/site';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page-head container">
      <p class="eyebrow">Contacto</p>
      <h1>Hablemos</h1>
    </section>

    <section class="container contact section">
      <div class="contact__info">
        <p class="eyebrow">Datos</p>
        <p><a [href]="'mailto:' + site.email">{{ site.email }}</a></p>
        <p>{{ site.phone }}</p>
        <p>{{ site.address }}<br />{{ site.city }}</p>
        <p class="muted">{{ site.schedule }}</p>
        <a class="btn btn--outline" [href]="whatsappUrl" target="_blank" rel="noopener">WhatsApp</a>
        <p class="muted small">Datos de muestra.</p>
      </div>

      <form class="form" [formGroup]="form" (ngSubmit)="submit()" novalidate>
        <label>
          Nombre
          <input type="text" formControlName="name" autocomplete="name" />
          @if (invalid('name')) { <span class="error">Ingresa tu nombre.</span> }
        </label>
        <label>
          Correo
          <input type="email" formControlName="email" autocomplete="email" />
          @if (invalid('email')) { <span class="error">Ingresa un correo válido.</span> }
        </label>
        <label>
          Teléfono (opcional)
          <input type="tel" formControlName="phone" autocomplete="tel" />
        </label>
        <label>
          Mensaje
          <textarea rows="6" formControlName="message"></textarea>
          @if (invalid('message')) { <span class="error">Cuéntanos brevemente tu proyecto.</span> }
        </label>
        <button class="btn" type="submit">Enviar mensaje</button>
        @if (sent()) {
          <p class="muted">Se abrirá tu programa de correo con el mensaje listo para enviar.</p>
        }
      </form>
    </section>
  `,
})
export class Contact {
  protected readonly site = SITE;
  protected readonly whatsappUrl = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent('Hola, me gustaría consultar sobre un proyecto.')}`;
  protected readonly sent = signal(false);

  private readonly fb = inject(FormBuilder).nonNullable;
  protected readonly form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  protected invalid(name: 'name' | 'email' | 'message'): boolean {
    const c = this.form.controls[name];
    return c.invalid && (c.touched || c.dirty);
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { name, email, phone, message } = this.form.getRawValue();
    const body = `${message}\n\nNombre: ${name}\nCorreo: ${email}\nTeléfono: ${phone || '-'}`;
    const subject = `Consulta de ${name}`;
    this.sent.set(true);
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
}
