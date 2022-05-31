import * as React from 'react';
import { useState, useEffect } from 'react';
import { Url } from 'url';
import Tree from './components/Tree';
import hierarchySchema from './hierarchySchema';

const App = (props: AppProps) => {
	const [profileList, setProfileList] = useState<Profile[]>([]);

	function applyHierarchy(list: Profile[], schema: HierarchyItem[]): Profile[] {
		return schema.map((hierarchyItem: HierarchyItem): Profile => {

			let item: Profile = replaceWithProfile(list, hierarchyItem)
			let { children } = hierarchyItem;

			if (children && children.length > 0) {
				item.children = applyHierarchy(list, children);
			}

			return item;
		});
	}

	function replaceWithProfile(list: Profile[], schema: HierarchyItem): Profile {
		const item: Profile = list.find(item => item._id === schema._id) || {} as Profile;
		return item;
	}

	useEffect(() => {
		async function getProfileList() {
			try {
				const res = await fetch('/api/profile');
				const profileList = await res.json();
				
				setProfileList(applyHierarchy(profileList, hierarchySchema));
			} catch (error) {
				console.log(error);
			}
		}
		getProfileList();
	}, []);

	return (
		<main className="container my-5">
			<h1 className="text-primary text-center">Tree UI</h1>
			<Tree data={profileList} />
		</main>
	);
};

interface AppProps {}
interface Profile {
		_id: string;
		picture: Url;
		age: number;
		eyeColor: string;
		name: {
			first: string;
			last: string;
		}
		company: string;
		email: string;
		phone: string;
		address: string;
		about: string;
		registered: string;
		tags: string[];
		children: Profile[];
}
interface HierarchyItem {
	_id: string;
	children: HierarchyItem[];
}

export default App;
