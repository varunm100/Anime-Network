import { Graph } from "react-d3-graph";
import { useState, useEffect } from "react"
import InfoCard from './InfoCard.js';
import malScraper from 'mal-scraper'

let fetchSet = new Set();
let visRec = new Set();
let maxItems = 3;

let globalData = {
  nodes: [{ id: "40028", name: "Attack on Titan Final Season", image: "https://cdn.myanimelist.net/images/anime/1000/110531.jpg"}],
  links: [
  ],
};
fetchSet.add("40028")

function addChild(parentId, child){
  globalData.links.push({source: parentId, target: child.id})
  if(fetchSet.has(child.id)) return;
  fetchSet.add(child.id)
  globalData.nodes.push(child)
}

function getAnimeObject(data) {
  const url = data.animeLink
  let id = ''
  for(let i = url.length-1, found = false; i >= 0; --i) {
    if(url[i] === '/' && found) break
    if(found) id+=data.animeLink[i]
    if(url[i] === '/') found = true
  }
  return {
    id: id.split('').reverse().join(''),
    name: data.anime,
    image: data.pictureImage.slice(0, 27) + data.pictureImage.slice(35, data.pictureImage.length)
  }
}

async function clickNode(nodeId, node) {
  if(visRec.has(nodeId)) return;
  visRec.add(nodeId)
  const shows = await malScraper.getRecommendationsList(node)
  fetchSet.add(nodeId)
  for(let i in shows) {
    if(i > maxItems-1) break;
    if(typeof shows[i] === 'object') addChild(nodeId, getAnimeObject(shows[i]))
  }
}

const config = {
  nodeHighlightBehaviour: true,
  d3: {
    disableLinkForce: true,
    linkLength: 1000,
  },
  node: {
    size: {
      height: 5000,
      width: 3937,
    },
    viewGenerator: (node) => {
      return <InfoCard title={node.name} image={node.image}></InfoCard>
    },
    renderLabel: false,
  },
  link: {
    highlightColor: "lightblue",
  },
  width: window.innerWidth,
  height: window.innerHeight,
};

export default function TreeGraph() {
  const [data, setData] = useState(globalData); 
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    setData(globalData)
    setUpdate(false)
  }, [update])
  return <Graph
          id="graph-id"
          data={data}
          config={config}
          onClickNode={
          async function(nodeId, node) {
            await clickNode(nodeId,node);
            console.log(globalData);
            setUpdate(true);
          }
        }
  />
}