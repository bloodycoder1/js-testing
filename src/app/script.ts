console.log("Hi There")

export function add(a: number, b: number): number {
    return a + b;
}

export function subtract(a: number, b: number): number {
    return a - b;
}
export function getuser():{id:number, name:string, skills:string[],isActive:boolean}{
    const user = {
    id: 101,
    name: 'Alex',
    skills: ['React', 'Node.js', 'TypeScript'],
    isActive: true
};
return user
}