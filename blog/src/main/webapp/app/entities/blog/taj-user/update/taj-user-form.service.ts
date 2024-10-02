import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ITajUser, NewTajUser } from '../taj-user.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITajUser for edit and NewTajUserFormGroupInput for create.
 */
type TajUserFormGroupInput = ITajUser | PartialWithRequiredKeyOf<NewTajUser>;

type TajUserFormDefaults = Pick<NewTajUser, 'id'>;

type TajUserFormGroupContent = {
  id: FormControl<ITajUser['id'] | NewTajUser['id']>;
  login: FormControl<ITajUser['login']>;
};

export type TajUserFormGroup = FormGroup<TajUserFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TajUserFormService {
  createTajUserFormGroup(tajUser: TajUserFormGroupInput = { id: null }): TajUserFormGroup {
    const tajUserRawValue = {
      ...this.getFormDefaults(),
      ...tajUser,
    };
    return new FormGroup<TajUserFormGroupContent>({
      id: new FormControl(
        { value: tajUserRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      login: new FormControl(tajUserRawValue.login, {
        validators: [Validators.required, Validators.minLength(7)],
      }),
    });
  }

  getTajUser(form: TajUserFormGroup): ITajUser | NewTajUser {
    return form.getRawValue() as ITajUser | NewTajUser;
  }

  resetForm(form: TajUserFormGroup, tajUser: TajUserFormGroupInput): void {
    const tajUserRawValue = { ...this.getFormDefaults(), ...tajUser };
    form.reset(
      {
        ...tajUserRawValue,
        id: { value: tajUserRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): TajUserFormDefaults {
    return {
      id: null,
    };
  }
}
