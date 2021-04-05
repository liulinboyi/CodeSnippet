document.write(`
<style>
#el {
  width: 100px;
  height: 100px;
  background: red;
}
</style>
<html>
<div id=el>
</div>
<script>
el.style.transition = "ease 10s"

function start() {
  el.style.transform = "translate(300px,300px)"
}

function stop() {
    debugger
  el.style.transition = "none"
  let {
    x,
    y
  } = el.getBoundingClientRect()
//   el.style.transform = "translate" + "(" + x + "px" +  y + "px" + ")"
el.style.transform = \`translate(\${x}px \${y}px)\`
}
</script>
</html>
`)