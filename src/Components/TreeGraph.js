import { Graph } from "react-d3-graph";
import { useState, useEffect } from "react";
import malScraper from 'mal-scraper';
import InfoCard from './InfoCard';

let fetchSet = new Set(), visRec = new Set(), maxItems = 3;

let graphData = {
  nodes: [{ id: "40028",
            name: "Attack on Titan Final Season",
            image: "https://cdn.myanimelist.net/images/anime/1000/110531.jpg" }],
  links: [],
};
fetchSet.add("40028");

function addChild(parentId, child, color){
  graphData.links.push({source: parentId, target: child.id, color: color});
  if(fetchSet.has(child.id)) return;
  fetchSet.add(child.id);
  graphData.nodes.push(child);
}

function getAnimeObject(data) {
  const url = data.animeLink;
  let id = '';
  for(let i = url.length-1, found = false; i >= 0; --i) {
    if(url[i] === '/' && found) break;
    if(found) id+=url[i];
    if(url[i] === '/') found = true;
  }
  return {
    id: id.split('').reverse().join(''),
    name: data.anime,
    image: data.pictureImage.slice(0, 27) + data.pictureImage.slice(35, data.pictureImage.length)
  };
};

async function updateRecs(nodeId, node) {
  if(visRec.has(nodeId)) return;
  visRec.add(nodeId);
  const shows = await malScraper.getRecommendationsList(node);
  fetchSet.add(nodeId);
  const randomColor = '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
  for(let i in shows) {
    if(i > maxItems-1) break;
    if(typeof shows[i] === 'object') addChild(nodeId, getAnimeObject(shows[i]), randomColor);
  }
}

const config = {
  d3: {
    alphaTarget: 0.05,
    gravity: -5000,
    linkLength: 120,
    disableLinkForce: false,
  },
  node: {
    size: {
      height: 5000,
      width: 3937,
    },
    viewGenerator: (node) => {
      return <InfoCard title={node.name} image={node.image}></InfoCard>;
    },
    renderLabel: false,
  },
  link: {

  },
  width: window.innerWidth,
  height: window.innerHeight,
};

export default function TreeGraph() {
  const [graph, setGraph] = useState(graphData); 
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    setGraph(graphData);
    setUpdate(false);
  }, [update]);

  return <Graph
           id="graph-id"
           data={graph}
           config={config}
           onClickNode={
             async function(nodeId, node) {
               await updateRecs(nodeId,node);
               setUpdate(true);
             }
           }
	 />;
}
