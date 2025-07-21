const itemsContainer = document.querySelector('.items');
    const items = document.querySelectorAll('.item');

    items.forEach(item => {
      item.style.position = 'absolute'; // allows free movement
      const rect = item.getBoundingClientRect();
      item.style.left = rect.left - itemsContainer.offsetLeft + 'px';
      item.style.top = rect.top - itemsContainer.offsetTop + 'px';

      item.addEventListener('mousedown', dragStart);
    });

    let selectedItem = null;
    let offsetX, offsetY;

    function dragStart(e) {
      selectedItem = e.target;
      offsetX = e.offsetX;
      offsetY = e.offsetY;

      document.addEventListener('mousemove', dragMove);
      document.addEventListener('mouseup', dragEnd);
    }

    function dragMove(e) {
      if (!selectedItem) return;

      const containerRect = itemsContainer.getBoundingClientRect();
      const itemWidth = selectedItem.offsetWidth;
      const itemHeight = selectedItem.offsetHeight;

      let x = e.clientX - containerRect.left - offsetX;
      let y = e.clientY - containerRect.top - offsetY;

      // Boundary check
      x = Math.max(0, Math.min(x, itemsContainer.clientWidth - itemWidth));
      y = Math.max(0, Math.min(y, itemsContainer.clientHeight - itemHeight));

      selectedItem.style.left = x + 'px';
      selectedItem.style.top = y + 'px';
    }

    function dragEnd() {
      document.removeEventListener('mousemove', dragMove);
      document.removeEventListener('mouseup', dragEnd);
      selectedItem = null;
    }