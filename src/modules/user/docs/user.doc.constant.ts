import { faker } from '@faker-js/faker';

export const UserDocQueryStatus = [
    {
        name: 'status',
        allowEmptyValue: true,
        required: false,
        type: 'string',
        example: 'active,inactive',
        description: "enum value with ',' delimiter",
    },
];

export const UserDocQueryBlocked = [
    {
        name: 'blocked',
        allowEmptyValue: true,
        required: false,
        type: 'string',
        example: 'true,false',
        description: "boolean value with ',' delimiter",
    },
];

export const UserDocQueryInactivePermanent = [
    {
        name: 'inactivePermanent',
        allowEmptyValue: true,
        required: false,
        type: 'string',
        example: 'true,false',
        description: "boolean value with ',' delimiter",
    },
];

export const UserDocParamsId = [
    {
        name: 'id',
        allowEmptyValue: false,
        required: true,
        type: 'string',
        example: faker.string.uuid(),
    },
];
