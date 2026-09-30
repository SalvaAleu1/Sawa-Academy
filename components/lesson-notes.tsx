export function LessonNotes({text}:{text:string}){
  const lines=text.split(/\r?\n/);
  const nodes:React.ReactNode[]=[];
  let bullets:string[]=[];
  const flush=()=>{
    if(!bullets.length)return;
    nodes.push(<ul className="lesson-notes-list" key={"u"+nodes.length}>{bullets.map((x,i)=><li key={i}>{x}</li>)}</ul>);
    bullets=[];
  };
  lines.forEach((raw)=>{
    const line=raw.trim();
    if(!line){flush();return;}
    if(line.startsWith("## ")){flush();nodes.push(<h2 key={"h2"+nodes.length}>{line.slice(3)}</h2>);return;}
    if(line.startsWith("### ")){flush();nodes.push(<h3 key={"h3"+nodes.length}>{line.slice(4)}</h3>);return;}
    if(line.startsWith("• ")||line.startsWith("- ")){bullets.push(line.slice(2));return;}
    flush();nodes.push(<p key={"p"+nodes.length}>{line}</p>);
  });
  flush();
  return <div className="lesson-notes">{nodes}</div>;
}
