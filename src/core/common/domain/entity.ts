const isEntity = (v: any): v is Entity<any> => {
    return v instanceof Entity;
};

export abstract class Entity<T> {
    protected readonly _id?: string;
    protected props: T;

    constructor (props: T, id?: string) {
        this._id = id;
        this.props = props;
    }

    public get toObject(): T {
        return this.props;
    }

    get id(): string | undefined {
        return this._id;
    }

    public equals(object?: Entity<T>) : boolean {

        if (object == null) {
            return false;
        }

        if (this === object) {
            return true;
        }

        if (!isEntity(object)) {
            return false;
        }

        if (!this._id || !this._id.length) {
            return false;
        }

        return this._id === object.id;
    }
}
