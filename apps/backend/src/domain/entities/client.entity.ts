import { BaseEntity, IBaseEntity } from '~/domain/entities/base.entity';
import { Currency } from '~/domain/value-objects/currency.value-object';
import { Id } from '../value-objects/id.value-object';

interface IClient extends IBaseEntity {
	name: string;
	salary: Currency;
	companyValue: Currency;
}

type IRawClient = Omit<IClient, keyof IBaseEntity>;

export class Client extends BaseEntity {
	private _props: IRawClient;

	constructor(payload: IClient, id?: Id) {
		const { createdAt, updatedAt, name, salary, companyValue } = payload;

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

	public update(props: Partial<IRawClient>): void {
		const newProps: IClient = {
			companyValue: props.companyValue || this._props.companyValue,
			salary: props.salary || this._props.salary,
			name: props.name || this._props.name,
			createdAt: this.createdAt,
			updatedAt: new Date(),
		};

		this.validate(newProps);

		this._props = newProps;
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
