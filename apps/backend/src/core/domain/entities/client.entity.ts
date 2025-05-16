import { BaseEntity, IBaseEntity } from '~/core/domain/entities/base.entity';
import { Currency } from '~/core/domain/value-objects/currency.value-object';

interface IClient extends IBaseEntity {
	name: string;
	salary: Currency;
	companyValue: Currency;
}

export class Client extends BaseEntity {
	private _props: IClient;

	constructor(payload: IClient) {
		const { id, createdAt, updatedAt, name, salary, companyValue } = payload;

		super({ id, createdAt, updatedAt });

		this.validate(payload);

		this._props = { name, salary, companyValue };
	}

	public validate({ salary, companyValue }: IClient): void {
		if (!(salary instanceof Currency)) {
			throw new Error('Salary must be a valid currency');
		}

		if (!(companyValue instanceof Currency)) {
			throw new Error('Company value must be a valid currency');
		}
	}

	public update(props: Partial<Omit<IClient, keyof IBaseEntity>>): void {
		this._props = { ...this._props, ...props };
		this.updatedAt = new Date();
	}

	get name(): string {
		return this._props.name;
	}

	get salary(): Currency {
		return this._props.salary;
	}

	get companyValue(): Currency {
		return this._props.companyValue;
	}
}
