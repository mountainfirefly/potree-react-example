/* eslint-disable no-undef */
import React, {useEffect} from 'react';

function App() {
  useEffect(() => {
    window.viewer = new Potree.Viewer(document.getElementById("potree_render_area"));
      
      viewer.setEDLEnabled(true);
      viewer.setDescription("Adding a custom section to the sidebar");
      
      viewer.loadGUI(() => {
        viewer.toggleSidebar();
        
        let section = $(`
          <h3 id="menu_meta" class="accordion-header ui-widget"><span>Metadata</span></h3>
          <div class="accordion-content ui-widget pv-menu-list"></div>
        `);
        let content = section.last();
        content.html(`
        <div class="pv-menu-list">
          A custom Section in the sidebar!<br>
          <br>	
          Uncomment "content.hide();" to hide content by default.<br>
          <br>
          Take a look at src/viewer/sidebar.html and sidebar.js to 
          learn how the other sections were populated.
        </div>
        `);
        section.first().click(() => content.slideToggle());
        section.insertBefore($('#menu_about'));
        
      });
      
      Potree.loadPointCloud("./pointclouds/vol_total/cloud.js", "Sorvilier", e => {
        viewer.scene.addPointCloud(e.pointcloud);
        viewer.fitToScreen();
      });
  }, [])

  return (
    <div className="potree_container">
      <div id="potree_render_area"></div>
      <div id="potree_sidebar_container"> </div>
    </div>
  )
}

export default App;
