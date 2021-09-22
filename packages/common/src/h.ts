export function h(
	name: (props: { [key: string]: any }) => any,
	props: { [key: string]: any },
	children: [],
): any {
	if (name.name === 'Application') {
		return children.reduce(prev => prev, {});
	}
	return name({ children, ...props });
}
