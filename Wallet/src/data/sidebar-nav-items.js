export default function () {
  return [
    
	{
    title: 'Developers',
    authorize: ['developer'],
    items: [{
      title: 'Applications',
      to: '/apps',
      htmlBefore: '<i class="material-icons">&#xE917;</i>',
      htmlAfter: '',
      
    }],
  },
 {
    title: 'Administration',
    authorize: ['administrator'],
    items: [{
      title: 'Overview',
      htmlBefore: '<i class="material-icons">view_module</i>',
      to: '/components-overview',
    }, {
      title: 'Tables',
      htmlBefore: '<i class="material-icons">table_chart</i>',
      to: '/tables',
    }, {
      title: 'Blog Posts',
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: '/blog-posts',
    }],
  },
  ];
}
