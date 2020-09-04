export interface Person {
  firstName: string;
  lastName: string;
}

export const fullName = (person: Person): string => `${person.firstName} ${person.lastName}`;
