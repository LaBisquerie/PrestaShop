import ImportData from '@data/faker/import';
import type {ImportCategory} from '@data/types/import';

const records: ImportCategory[] = [
  {
    id: 10,
    active: 1,
    name: 'category_1',
    parent_category: 'Home',
    root_category: '0',
    description: 'Description for the category 1',
  },
  {
    id: 11,
    active: 1,
    name: 'category_2',
    parent_category: 'Home',
    root_category: '0',
    description: 'Description for the category 2',
  },
  {
    id: 12,
    active: 1,
    name: 'category_3',
    parent_category: 'Home',
    root_category: '0',
    description: 'Description for the category 3',
  },
  {
    id: 13,
    active: 1,
    name: 'category_4',
    parent_category: 'Home',
    root_category: '0',
    description: 'Description for the category 4',
  },
  {
    id: 14,
    active: 1,
    name: 'category_5',
    parent_category: 'Home',
    root_category: '0',
    description: 'Description for the category 5',
  },
  {
    id: 15,
    active: 1,
    name: 'category_6',
    parent_category: 'Home',
    root_category: '0',
    description: 'Description for the category 6',
  },
  {
    id: 16,
    active: 1,
    name: 'category_7',
    parent_category: 'Home',
    root_category: '0',
    description: 'Description for the category 7',
  },
  {
    id: 17,
    active: 1,
    name: 'category_8',
    parent_category: 'Home',
    root_category: '0',
    description: 'Description for the category 8',
  },
  {
    id: 18,
    active: 1,
    name: 'category_9',
    parent_category: 'Home',
    root_category: '0',
    description: 'Description for the category 9',
  },
  {
    id: 19,
    active: 1,
    name: 'category_10',
    parent_category: 'Home',
    root_category: '0',
    description: 'Description for the category 10',
  },
  {
    id: 20,
    active: 1,
    name: 'category_11',
    parent_category: 'Home',
    root_category: '0',
    description: 'Description for the category 11',
  },
];

export default new ImportData({
  entity: 'Categories',
  header: [
    {id: 'id', title: 'Category ID'},
    {id: 'active', title: 'Active (0/1)'},
    {id: 'name', title: 'Name *'},
    {id: 'parent_category', title: 'Parent category'},
    {id: 'root_category', title: 'Root category (0/1)'},
    {id: 'description', title: 'Description'},
  ],
  records,
});