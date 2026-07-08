<?php
$table = hes_womens_clinic_schedule_table_content();
?>
<section class="about-schedule-table" aria-labelledby="about-schedule-title">
  <div class="section-shell section-shell--gutter">
    <header class="about-schedule-table__header">
      <p class="about-schedule-table__eyebrow"><?php echo esc_html($table['eyebrow']); ?></p>
      <h2 id="about-schedule-title" class="about-schedule-table__title"><?php echo esc_html($table['title']); ?></h2>
    </header>

    <div class="about-schedule-table__wrap" role="region" aria-label="<?php esc_attr_e('요일별 진료시간', '365-hes-womens-clinic'); ?>" tabindex="0">
      <table class="about-schedule-table__table">
        <thead>
          <tr>
            <?php foreach ($table['columns'] as $column) : ?>
              <th scope="col"><?php echo esc_html($column); ?></th>
            <?php endforeach; ?>
          </tr>
        </thead>
        <tbody>
          <?php foreach ($table['rows'] as $row) : ?>
            <tr>
              <th scope="row"><?php echo esc_html($row['label']); ?></th>
              <?php foreach ($row['values'] as $value) : ?>
                <?php
                $cell_class = '';
                if ($value === '휴진') {
                  $cell_class = 'is-closed';
                } elseif ($value === '-') {
                  $cell_class = 'is-muted';
                }
                ?>
                <td class="<?php echo esc_attr($cell_class); ?>">
                  <?php echo esc_html($value); ?>
                </td>
              <?php endforeach; ?>
            </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
    </div>

    <?php if (!empty($table['note'])) : ?>
      <p class="about-schedule-table__note"><?php echo esc_html($table['note']); ?></p>
    <?php endif; ?>
  </div>
</section>
